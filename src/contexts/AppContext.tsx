"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  User,
  News,
  Ticket,
  TicketReply,
  CoinPackage,
  CreditLoad,
  SiteSettings,
} from '@/lib/types';
import * as store from '@/lib/store';

export interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (username: string, password?: string) => Promise<boolean> | boolean;
  logout: () => Promise<void> | void;
  register: (username: string, email: string, password?: string) => Promise<boolean> | boolean;

  // Data
  users: User[];
  news: News[];
  tickets: Ticket[];
  coinPackages: CoinPackage[];
  creditLoads: CreditLoad[];
  settings: SiteSettings;

  // Actions
  refreshData: () => void;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void> | void;
  addNews: (newsItem: News | Omit<News, 'id'>) => Promise<void> | void;
  updateNews: (newsItem: News) => Promise<void> | void;
  deleteNews: (id: string) => Promise<void> | void;
  addTicket: (ticket: Ticket | { subject: string; message: string }) => Promise<void> | void;
  addTicketReply: (ticketId: string, reply: TicketReply | string) => Promise<void> | void;
  updateTicketStatus: (ticketId: string, status: Ticket['status'] | string) => Promise<void> | void;
  addCreditLoad: (load: CreditLoad | { username: string; amount: number }) => void;
  updateUser: (userOrId: User | string, data?: Partial<User>) => Promise<void> | void;
  deleteUser: (id: string) => Promise<void> | void;

  // State
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [coinPackages, setCoinPackages] = useState<CoinPackage[]>([]);
  const [creditLoads, setCreditLoads] = useState<CreditLoad[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    showRecentRegistrations: true,
    showRecentCredits: true,
    announcement: '',
    serverIp: 'play.plumya.net',
    serverIP: 'play.plumya.net',
    serverPort: '25565',
    maxPlayers: 200,
    onlinePlayers: 47,
    discordServerId: '1097230283084111882',
    discordInviteUrl: 'https://discord.gg',
  });

  // Load data from store and backend API
  const refreshData = useCallback(async () => {
    // 1. Local fallback data
    setUsers(store.getUsers());
    setNews(store.getNews());
    setTickets(store.getTickets());
    setCoinPackages(store.getCoinPackages());
    setCreditLoads(store.getCreditLoads());
    setSettings(store.getSettings());
    setCurrentUser(store.getCurrentUser());

    // 2. Try fetching live from PostgreSQL backend
    try {
      const [meRes, dataRes] = await Promise.all([
        fetch('/api/auth/me').catch(() => null),
        fetch('/api/data').catch(() => null),
      ]);

      if (meRes && meRes.ok) {
        const meData = await meRes.json();
        if (meData.authenticated && meData.user) {
          setCurrentUser(meData.user);
          store.setCurrentUser(meData.user);
        }
      }

      if (dataRes && dataRes.ok) {
        const data = await dataRes.json();
        if (data.success) {
          if (data.settings) {
            setSettings(data.settings);
            store.updateSettings(data.settings);
          }
          if (data.news && data.news.length > 0) {
            setNews(data.news);
          }
          if (data.coinPackages && data.coinPackages.length > 0) {
            setCoinPackages(data.coinPackages);
          }
          if (data.recentUsers && data.recentUsers.length > 0) {
            setUsers(data.recentUsers);
          }
          if (data.recentCredits && data.recentCredits.length > 0) {
            setCreditLoads(data.recentCredits);
          }
        }
      }

      // Fetch tickets if logged in
      const ticketsRes = await fetch('/api/tickets').catch(() => null);
      if (ticketsRes && ticketsRes.ok) {
        const tData = await ticketsRes.json();
        if (tData.success && tData.tickets) {
          setTickets(tData.tickets);
        }
      }
    } catch {
      // Local fallback in store already populated
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    store.initializeStore();
    refreshData().finally(() => setLoading(false));
  }, [refreshData]);

  // Auth functions with Backend API
  const login = useCallback(
    async (username: string, password = ''): Promise<boolean> => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
            store.setCurrentUser(data.user);
            refreshData();
            return true;
          }
        }
      } catch {
        // Fallback to store if server unreachable
      }

      // Local store fallback
      const allUsers = store.getUsers();
      const user = allUsers.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );
      if (user) {
        store.setCurrentUser(user);
        setCurrentUser(user);
        return true;
      }
      return false;
    },
    [refreshData]
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    store.setCurrentUser(null);
    setCurrentUser(null);
    window.location.href = '/';
  }, []);

  const register = useCallback(
    async (username: string, email: string, password = ''): Promise<boolean> => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
            store.setCurrentUser(data.user);
            refreshData();
            return true;
          }
        }
      } catch {
        // Fallback to local store
      }

      const allUsers = store.getUsers();
      const exists = allUsers.some(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );
      if (exists) return false;

      const now = new Date().toISOString();
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        credits: 0,
        role: 'user',
        createdAt: now,
        registeredAt: now,
      };

      store.addUser(newUser);
      store.setCurrentUser(newUser);
      setCurrentUser(newUser);
      refreshData();
      return true;
    },
    [refreshData]
  );

  // Data action wrappers
  const handleUpdateSettings = useCallback(
    async (newSettings: Partial<SiteSettings>) => {
      store.updateSettings(newSettings);
      try {
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleAddNews = useCallback(
    async (newsItem: News | Omit<News, 'id'>) => {
      store.addNews(newsItem);
      try {
        await fetch('/api/admin/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newsItem.title,
            content: newsItem.content,
          }),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleUpdateNews = useCallback(
    (newsItem: News) => {
      store.updateNews(newsItem);
      refreshData();
    },
    [refreshData]
  );

  const handleDeleteNews = useCallback(
    async (id: string) => {
      store.deleteNews(id);
      try {
        await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleAddTicket = useCallback(
    async (ticket: Ticket | { subject: string; message: string }) => {
      const now = new Date().toISOString();
      if ('id' in ticket) {
        store.addTicket(ticket);
      } else {
        const user = store.getCurrentUser();
        const newTicket: Ticket = {
          id: `ticket-${Date.now()}`,
          userId: user?.id || 'guest',
          username: user?.username || 'Misafir',
          subject: ticket.subject,
          message: ticket.message,
          status: 'open',
          createdAt: now,
          replies: [],
        };
        store.addTicket(newTicket);
      }

      try {
        await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: ticket.subject,
            message: ticket.message,
          }),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleAddTicketReply = useCallback(
    async (ticketId: string, reply: TicketReply | string) => {
      const now = new Date().toISOString();
      const user = store.getCurrentUser();
      const isAdmin = user?.role === 'admin';

      let replyObj: TicketReply;
      const messageText = typeof reply === 'string' ? reply : reply.message;

      if (typeof reply === 'string') {
        replyObj = {
          id: `reply-${Date.now()}`,
          username: user?.username || (isAdmin ? 'PlumyaAdmin' : 'Kullanıcı'),
          message: reply,
          date: now,
          createdAt: now,
          isAdmin,
        };
      } else {
        replyObj = {
          ...reply,
          date: reply.date || reply.createdAt || now,
          createdAt: reply.createdAt || reply.date || now,
        };
      }

      store.addTicketReply(ticketId, replyObj);

      try {
        await fetch(`/api/tickets/${ticketId}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageText }),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleUpdateTicketStatus = useCallback(
    async (ticketId: string, status: Ticket['status'] | string) => {
      const validStatus: Ticket['status'] =
        status === 'answered' || status === 'closed' ? status : 'open';
      store.updateTicketStatus(ticketId, validStatus);

      try {
        await fetch('/api/admin/tickets', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: ticketId, status: validStatus }),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleAddCreditLoad = useCallback(
    (load: CreditLoad | { username: string; amount: number }) => {
      const now = new Date().toISOString();
      const fullLoad: CreditLoad = {
        id: 'id' in load ? load.id : `load-${Date.now()}`,
        username: load.username,
        amount: load.amount,
        date: 'date' in load && load.date ? load.date : now,
        createdAt: 'createdAt' in load && load.createdAt ? load.createdAt : now,
      };
      store.addCreditLoad(fullLoad);
      refreshData();
    },
    [refreshData]
  );

  const handleUpdateUser = useCallback(
    async (userOrId: User | string, data?: Partial<User>) => {
      store.updateUser(userOrId, data);
      const userId = typeof userOrId === 'string' ? userOrId : userOrId.id;
      const updateData = typeof userOrId === 'string' ? data : userOrId;

      try {
        await fetch('/api/admin/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, ...updateData }),
        });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const handleDeleteUser = useCallback(
    async (id: string) => {
      store.deleteUser(id);
      try {
        await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      } catch {
        // local updated
      }
      refreshData();
    },
    [refreshData]
  );

  const value: AppContextType = {
    currentUser,
    login,
    logout,
    register,
    users,
    news,
    tickets,
    coinPackages,
    creditLoads,
    settings,
    refreshData,
    updateSettings: handleUpdateSettings,
    addNews: handleAddNews,
    updateNews: handleUpdateNews,
    deleteNews: handleDeleteNews,
    addTicket: handleAddTicket,
    addTicketReply: handleAddTicketReply,
    updateTicketStatus: handleUpdateTicketStatus,
    addCreditLoad: handleAddCreditLoad,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
