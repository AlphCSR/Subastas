"use client"

import { OverviewView } from "./views/overview-view"
import { AuctionsView } from "./views/auctions-view"
import { MyBidsView } from "./views/my-bids-view"
import { ProductsView } from "./views/products-view"
import { CreateAuctionView } from "./views/create-auction-view"
import { UsersView } from "./views/users-view"
import { RolesView } from "./views/roles-view"
import { ProfileView } from "./views/profile-view"
import { HistoryView } from "./views/history-view"
import { FinishedAuctionsView } from "./views/finished-auctions-view"
import { WinnerView } from "./views/winner-view"
import { PaymentView } from "./views/payment-view"
import { PaymentMethodsView } from "./views/payment-methods-view"
import { PrizeManagementView } from "./views/prize-management-view"
import { ClaimsView } from "./views/claims-view"
import { ReportsView } from "./views/reports-view"
import { TechnicalSupportView } from "./views/technical-support-view"
import { AuctionStatesView } from "./views/auction-states-view"
import { NotificationsView } from "./views/notifications-view"

interface DashboardContentProps {
  activeView: string
}

export function DashboardContent({ activeView }: DashboardContentProps) {
  switch (activeView) {
    case "overview":
      return <OverviewView />
    case "auctions":
      return <AuctionsView />
    case "finished-auctions":
      return <FinishedAuctionsView />
    case "my-bids":
      return <MyBidsView />
    case "winner":
      return <WinnerView />
    case "products":
      return <ProductsView />
    case "create-auction":
      return <CreateAuctionView />
    case "payment":
      return <PaymentView />
    case "payment-methods":
      return <PaymentMethodsView />
    case "prize-management":
      return <PrizeManagementView />
    case "claims":
      return <ClaimsView />
    case "reports":
      return <ReportsView />
    case "technical-support":
      return <TechnicalSupportView />
    case "auction-states":
      return <AuctionStatesView />
    case "notifications":
      return <NotificationsView />
    case "users":
      return <UsersView />
    case "roles":
      return <RolesView />
    case "profile":
      return <ProfileView />
    case "history":
      return <HistoryView />
    default:
      return <OverviewView />
  }
}
