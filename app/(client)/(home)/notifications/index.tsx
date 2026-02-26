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

const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

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
