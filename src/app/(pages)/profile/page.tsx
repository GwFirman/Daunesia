"use client";

import { JSX, useEffect, useState } from "react";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { BarChart3, History, Trophy, Sprout, Leaf, BadgeCheck, Award } from "lucide-react";

// Update interface untuk menghapus image
interface UserStats {
  stats: {
    totalDetections: number;
    plantsIdentified: number;
    accuracyRate: number;
    favoriteCategory: string;
  };
  recentDetections: Array<{
    id: string;
    plantName: string;
    detectedAt: string;
    confidence: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
    progress?: number;
  }>;
}

// Tambahkan fungsi getAvatarUrl di awal file, sebelum component
const getAvatarUrl = (originalUrl: string | null, name: string = "User") => {
  if (!originalUrl) {
    // Generate avatar dari nama user dengan UI Avatars API
    const formattedName = encodeURIComponent(name.replace(/\s+/g, '+'));
    return `https://ui-avatars.com/api/?name=${formattedName}&background=73946B&color=ffffff&size=200`;
  }
  return originalUrl;
};

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'achievements'>('overview');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if not logged in
    if (!isPending && !session) {
      router.push('/login');
      return;
    }

    // Fetch user statistics when session is available
    if (session?.user) {
      fetchUserStats();
    }
  }, [session, isPending]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Fetching user stats...');
      console.log('👤 Current session:', session?.user?.email);

      const response = await fetch('/api/user/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);

        if (response.status === 401) {
          console.log('🔒 Unauthorized - redirecting to login');
          router.push('/login');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Fetched user stats:', data);

      if (data.recentDetections && data.recentDetections.length > 0) {
        console.log('📋 Recent detections found:', data.recentDetections.length);
      } else {
        console.log('📋 No recent detections found');
      }

      setUserStats(data);
    } catch (error) {
      console.error('❌ Error fetching user stats:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');

      // Set fallback empty data
      setUserStats({
        stats: {
          totalDetections: 0,
          plantsIdentified: 0,
          accuracyRate: 0,
          favoriteCategory: "Belum ada"
        },
        recentDetections: [],
        achievements: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <div className="text-lg text-gray-600">Memuat profil...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const userData = {
    id: session.user.id,
    name: session.user.name || 'User',
    email: session.user.email,
    // ✅ Ganti Unsplash dengan UI Avatar
    avatar: getAvatarUrl(session.user.image ?? null, session.user.name),
    joinDate: typeof session.user.createdAt === 'string'
      ? session.user.createdAt
      : new Date().toISOString(),
    // Add missing properties with fallbacks
    location: 'Indonesia', // Default location
    bio: 'Plant enthusiast yang senang mengidentifikasi tanaman.', // Default bio
    stats: userStats?.stats || {
      totalDetections: 0,
      plantsIdentified: 0,
      accuracyRate: 0,
      favoriteCategory: "Belum ada"
    },
    recentDetections: userStats?.recentDetections || [],
    achievements: userStats?.achievements || []
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Tanggal tidak valid';
    }
  };

  const normalizeIcon = (icon: string = '') => icon.trim().toLowerCase();

  const iconMap: Record<string, JSX.Element> = {
    badge: <BadgeCheck size={28} />,
    award: <Award size={28} />,
    leaf: <Leaf size={28} />,
    sprout: <Sprout size={28} />,
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      className="mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 py-10 md:py-16"
    >
      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error} - Menampilkan data default
            </p>
            <button
              onClick={fetchUserStats}
              className="text-yellow-900 underline hover:no-underline text-sm"
            >
              Coba lagi
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
            {/* Avatar & Basic Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-green-secondary"
                  onError={(e) => {
                    // ✅ Ganti fallback juga dengan UI Avatar
                    (e.target as HTMLImageElement).src = getAvatarUrl(null, userData.name);
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-primary rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-font-primary mb-1">
                {userData.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{userData.email}</p>
              {/* <p className="text-gray-500 text-sm">📍 {userData.location}</p> */}
            </div>

            {/* Bio
            <div className="mb-6">
              <h3 className="font-semibold text-font-primary mb-2">Bio</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {userData.bio}
              </p>
            </div> */}

            {/* Join Date */}
            <div className="bg-[#FFF7ED] p-4 rounded-lg shadow-xs">
              <p className="text-sm text-gray-600">
                Bergabung sejak <span className="text-[#F97316] font-semibold">{formatDate(userData.joinDate)}</span>
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="text-center p-4 bg-[#ECFDF5] rounded-lg shadow-xs">
                <div className="text-3xl font-bold text-[#10B981]">{userData.stats.totalDetections}</div>
                <div className="mt-1 text-xs text-gray-600">Total Deteksi</div>
              </div>
              <div className="text-center p-4 bg-[#EFF6FF] rounded-lg shadow-xs">
                <div className="text-3xl font-bold text-[#3B82F6]">{userData.stats.accuracyRate}%</div>
                <div className="mt-1 text-xs text-gray-600">Tingkat Akurasi</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto scrollbar-hide">
                {[
                  { key: 'overview', label: 'Ringkasan', icon: BarChart3 },
                  { key: 'history', label: 'Riwayat', icon: History },
                  { key: 'achievements', label: 'Pencapaian', icon: Trophy },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab.key
                        ? 'border-green-secondary text-green-primary bg-green-50'
                        : 'border-transparent text-gray-500 hover:text-green-primary hover:bg-gray-50'
                        }`}
                    >
                      <Icon className="w-4 h-4 text-green-primary" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Statistik Deteksi</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Deteksi */}
                    <div className="bg-[#DFF9EC] text-[#15803D] p-6 rounded-xl shadow-sm">
                      <div className="text-2xl md:text-3xl font-bold mb-2">{userData.stats.totalDetections}</div>
                      <div className="text-sm font-medium">Total Deteksi</div>
                    </div>

                    {/* Tanaman Teridentifikasi */}
                    <div className="bg-[#D9F5EF] text-[#0F766E] p-6 rounded-xl shadow-sm">
                      <div className="text-3xl font-bold mb-2">{userData.stats.plantsIdentified}</div>
                      <div className="text-sm font-medium">Tanaman Teridentifikasi</div>
                    </div>

                    {/* Tingkat Akurasi */}
                    <div className="bg-[#E6F4E1] text-[#4D7C0F] p-6 rounded-xl shadow-sm">
                      <div className="text-3xl font-bold mb-2">{userData.stats.accuracyRate}%</div>
                      <div className="text-sm font-medium">Tingkat Akurasi</div>
                    </div>
                  </div>

                  <div className="bg-[#ECFDF5] p-6 rounded-xl flex items-start gap-4 shadow-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D1FAE5] text-green-600">
                      <Sprout size={20} />
                    </div>
                    <div>
                      <h4 className="text-font-primary font-semibold ">Kategori Favorit</h4>
                      <p className="text-sm text-gray-600">{userData.stats.favoriteCategory}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* History Tab - Updated without images */}
              {activeTab === 'history' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Riwayat Deteksi Terbaru</h3>

                  {userData.recentDetections.length > 0 ? (
                    <div className="space-y-2">
                      {userData.recentDetections.map((detection) => (
                        <div
                          key={detection.id}
                          className="flex items-center justify-between p-4 bg-[#DFF9EC] rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#C8E8D4] rounded-full flex items-center justify-center text-[#2F6846]">
                              <Sprout size={22} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-font-primary">{detection.plantName}</h4>
                              <p className="text-sm text-[#15803D]">{formatDateTime(detection.detectedAt)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-[#15803D]">
                              {detection.confidence}% akurat
                            </div>
                            <div className="text-xs text-gray-500">
                              Confidence Level
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-6 bg-[#EDF6F3] border border-[#D3EADD] rounded-xl text-[#2F6846] shadow-sm">
                      <div className="mb-4 flex justify-center">
                        <Leaf size={44} className="text-[#4B8063]" strokeWidth={1.25} />
                      </div>
                      <p className="text-lg mb-2 font-semibold text-[#36644F]">
                        Belum ada riwayat deteksi
                      </p>
                      <p className="text-sm text-[#4B6E5D]">
                        Mulai deteksi tanaman pertamamu sekarang dan lihat hasilnya di sini!
                      </p>
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-green-secondary text-white rounded-xl hover:bg-green-primary transition-colors">
                      Lihat Semua Riwayat
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-font-primary mb-6">Pencapaian</h3>

                  {userData.achievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-6 rounded-xl border transition-all ${achievement.unlocked
                            ? 'bg-[#ECFDF5] border-[#D1FAE5]'
                            : 'bg-[#F8FAF9] border-gray-200'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-2 rounded-lg ${achievement.unlocked
                                ? 'bg-[#BBF7D0] text-green-primary'
                                : 'bg-gray-200 text-gray-400 grayscale opacity-60'
                                }`}
                            >

                              {iconMap[normalizeIcon(achievement.icon)]}
                            </div>

                            <div className="flex-1">
                              <h4
                                className={`font-semibold mb-1 ${achievement.unlocked ? 'text-font-primary' : 'text-gray-500'
                                  }`}
                              >
                                {achievement.title}
                              </h4>
                              <p
                                className={`text-sm mb-2 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                                  }`}
                              >
                                {achievement.description}
                              </p>

                              {achievement.unlocked ? (
                                <p className="text-xs text-green-primary font-medium">
                                  Dibuka pada{' '}
                                  {achievement.unlockedAt
                                    ? formatDate(achievement.unlockedAt)
                                    : 'Tanggal tidak tersedia'}
                                </p>
                              ) : (
                                <div className="text-xs text-gray-500">
                                  Progress: {achievement.progress || 0}/100
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div
                                      className="bg-green-primary h-2 rounded-full transition-all"
                                      style={{ width: `${achievement.progress || 0}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-6 bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl text-green-800 shadow-sm">
                      <div className="mb-4 flex justify-center">
                        <Award size={48} className="text-green-600" strokeWidth={1.5} />
                      </div>
                      <p className="text-lg mb-2 font-semibold text-green-700">
                        Belum ada pencapaian
                      </p>
                      <p className="text-sm text-green-600">
                        Mulai gunakan aplikasi untuk membuka pencapaian pertama!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}