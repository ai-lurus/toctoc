import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type NotificationTab = "all" | "unread";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Nueva reserva confirmada",
    body: "Tu servicio de limpieza está programado para mañana a las 10:00 AM",
    time: "Hace 5 min",
    icon: "•",
    isRead: false,
  },
  {
    id: "2",
    title: "Recordatorio de servicio",
    body: "Tu lavado de auto es en 2 horas. El proveedor llegará a las 3:00 PM",
    time: "Hace 1 hora",
    icon: "🔔",
    isRead: false,
  },
  {
    id: "3",
    title: "Pago procesado exitosamente",
    body: "Se procesó tu pago de $240",
    time: "Hace 3 horas",
    icon: "💳",
    isRead: false,
  },
  {
    id: "4",
    title: "Califica tu servicio",
    body: "Ayúdanos a mejorar. Califica el servicio de limpieza del 9 de Feb",
    time: "Ayer 5:20 PM",
    icon: "⭐",
    isRead: true,
  },
  {
    id: "5",
    title: "Servicio completado",
    body: "Tu servicio de lavado de auto ha sido completado exitosamente",
    time: "8 Feb 6:45 PM",
    icon: "✅",
    isRead: true,
  },
  {
    id: "6",
    title: "Proveedor en camino",
    body: "María López está en camino a tu domicilio",
    time: "8 Feb 3:00 PM",
    icon: "🚗",
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<NotificationTab>("all");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const visibleNotifications = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter((item) => !item.isRead);
    }
    return notifications;
  }, [activeTab, notifications]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.filtersWrap}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "all" && styles.tabButtonActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("all")}
            >
              <Text style={[styles.tabText, activeTab === "all" && styles.tabTextActive]}>
                Todos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === "unread" && styles.tabButtonActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("unread")}
            >
              <Text style={[styles.tabText, activeTab === "unread" && styles.tabTextActive]}>
                No leídas ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Marcar todas como leídas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listWrap}>
          {visibleNotifications.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No tienes notificaciones en esta sección.</Text>
            </View>
          ) : (
            visibleNotifications.map((item) => (
              <View
                key={item.id}
                style={[styles.item, !item.isRead && styles.unreadItem]}
              >
                <View style={styles.dot} />

                <View style={styles.itemMain}>
                  <View style={styles.topRow}>
                    <View style={styles.titleWithIcon}>
                      <Text style={styles.emoji}>{item.icon}</Text>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeNotification(item.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="trash-outline" size={14} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.body}>{item.body}</Text>

                  <View style={styles.bottomRow}>
                    <Text style={styles.time}>{item.time}</Text>
                    {!item.isRead ? (
                      <TouchableOpacity
                        onPress={() => markAsRead(item.id)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.markReadText}>Marcar como leída</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
