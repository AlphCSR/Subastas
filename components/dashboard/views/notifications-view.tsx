"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Smartphone, Check, Settings } from "lucide-react"

interface Notification {
  id: string
  type: "bid_outbid" | "auction_ending" | "auction_won" | "payment_reminder" | "delivery_update"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  channels: ("email" | "sms" | "push")[]
}

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "bid_outbid",
      title: "Tu puja ha sido superada",
      message: "Alguien ha pujado más alto en 'Reloj Vintage Omega'",
      timestamp: "2024-01-15T14:30:00",
      read: false,
      priority: "high",
      channels: ["email", "push"],
    },
    {
      id: "2",
      type: "auction_ending",
      title: "Subasta finalizando pronto",
      message: "'Pintura Original' finaliza en 30 minutos",
      timestamp: "2024-01-15T14:00:00",
      read: false,
      priority: "medium",
      channels: ["email", "push"],
    },
    {
      id: "3",
      type: "auction_won",
      title: "¡Felicitaciones! Has ganado",
      message: "Has ganado la subasta 'Guitarra Fender'",
      timestamp: "2024-01-15T12:00:00",
      read: true,
      priority: "high",
      channels: ["email", "sms", "push"],
    },
  ])

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    bidOutbid: true,
    auctionEnding: true,
    auctionWon: true,
    paymentReminders: true,
    deliveryUpdates: true,
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Baja</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bid_outbid":
        return <Bell className="h-5 w-5 text-red-600" />
      case "auction_ending":
        return <Bell className="h-5 w-5 text-orange-600" />
      case "auction_won":
        return <Bell className="h-5 w-5 text-green-600" />
      case "payment_reminder":
        return <Bell className="h-5 w-5 text-blue-600" />
      case "delivery_update":
        return <Bell className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600">Gestiona tus notificaciones y preferencias ({unreadCount} sin leer)</p>
        </div>

        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          <Check className="mr-2 h-4 w-4" />
          Marcar todas como leídas
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">
            Notificaciones
            {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No tienes notificaciones</h3>
                <p className="text-gray-600">Las notificaciones aparecerán aquí cuando ocurran eventos importantes</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? "border-blue-200 bg-blue-50" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            <div className="flex items-center space-x-1">
                              {notification.channels.includes("email") && <Mail className="h-4 w-4" />}
                              {notification.channels.includes("sms") && <MessageSquare className="h-4 w-4" />}
                              {notification.channels.includes("push") && <Smartphone className="h-4 w-4" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Canales de Notificación</span>
              </CardTitle>
              <CardDescription>Configura cómo quieres recibir las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <Label htmlFor="email">Notificaciones por Email</Label>
                </div>
                <Switch
                  id="email"
                  checked={notificationSettings.emailEnabled}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, emailEnabled: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <Label htmlFor="sms">Notificaciones por SMS</Label>
                </div>
                <Switch
                  id="sms"
                  checked={notificationSettings.smsEnabled}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <Label htmlFor="push">Notificaciones Push</Label>
                </div>
                <Switch
                  id="push"
                  checked={notificationSettings.pushEnabled}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, pushEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Notificación</CardTitle>
              <CardDescription>Selecciona qué eventos quieres que te notifiquen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="bidOutbid">Cuando mi puja sea superada</Label>
                <Switch
                  id="bidOutbid"
                  checked={notificationSettings.bidOutbid}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, bidOutbid: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auctionEnding">Cuando una subasta esté por finalizar</Label>
                <Switch
                  id="auctionEnding"
                  checked={notificationSettings.auctionEnding}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, auctionEnding: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auctionWon">Cuando gane una subasta</Label>
                <Switch
                  id="auctionWon"
                  checked={notificationSettings.auctionWon}
                  onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, auctionWon: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="paymentReminders">Recordatorios de pago</Label>
                <Switch
                  id="paymentReminders"
                  checked={notificationSettings.paymentReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, paymentReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="deliveryUpdates">Actualizaciones de entrega</Label>
                <Switch
                  id="deliveryUpdates"
                  checked={notificationSettings.deliveryUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings((prev) => ({ ...prev, deliveryUpdates: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
