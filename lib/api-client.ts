// Cliente API centralizado para todas las llamadas al backend
class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Profile APIs
  async updateProfile(data: any) {
    return this.request("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async uploadProfilePhoto(file: File) {
    const formData = new FormData()
    formData.append("photo", file)

    return this.request("/profile/photo", {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    })
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.request("/profile/password", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Auction APIs
  async createAuction(data: any) {
    return this.request("/auctions", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async saveDraft(data: any) {
    return this.request("/auctions/draft", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async placeBid(auctionId: string, amount: number) {
    return this.request(`/auctions/${auctionId}/bids`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    })
  }

  async watchAuction(auctionId: string, watch: boolean) {
    return this.request(`/auctions/${auctionId}/watch`, {
      method: "POST",
      body: JSON.stringify({ watch }),
    })
  }

  async askQuestion(auctionId: string, question: string) {
    return this.request(`/auctions/${auctionId}/questions`, {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  }

  // Role APIs
  async createRole(data: any) {
    return this.request("/roles", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateRole(id: string, data: any) {
    return this.request(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteRole(id: string) {
    return this.request(`/roles/${id}`, {
      method: "DELETE",
    })
  }

  async assignRoles(assignments: any[]) {
    return this.request("/roles/assign", {
      method: "POST",
      body: JSON.stringify({ assignments }),
    })
  }

  // Payment APIs
  async processPayment(data: any) {
    return this.request("/payments/process", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async addPaymentMethod(data: any) {
    return this.request("/payment-methods", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updatePaymentMethod(id: string, data: any) {
    return this.request(`/payment-methods/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deletePaymentMethod(id: string) {
    return this.request(`/payment-methods/${id}`, {
      method: "DELETE",
    })
  }

  async setDefaultPaymentMethod(id: string) {
    return this.request(`/payment-methods/${id}/default`, {
      method: "POST",
    })
  }

  // Claims APIs
  async createClaim(data: any) {
    return this.request("/claims", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateClaim(id: string, data: any) {
    return this.request(`/claims/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async cancelClaim(id: string) {
    return this.request(`/claims/${id}`, {
      method: "DELETE",
    })
  }

  async uploadClaimEvidence(claimId: string, files: File[]) {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`evidence_${index}`, file)
    })

    return this.request(`/claims/${claimId}/evidence`, {
      method: "POST",
      headers: {},
      body: formData,
    })
  }

  // Prize Management APIs
  async confirmDelivery(prizeId: string) {
    return this.request(`/prizes/${prizeId}/confirm-delivery`, {
      method: "POST",
    })
  }

  async reportProblem(prizeId: string, description: string) {
    return this.request(`/prizes/${prizeId}/report-problem`, {
      method: "POST",
      body: JSON.stringify({ description }),
    })
  }

  async updateShippingAddress(prizeId: string, address: any) {
    return this.request(`/prizes/${prizeId}/shipping-address`, {
      method: "PUT",
      body: JSON.stringify(address),
    })
  }

  // Technical Support APIs
  async resolveError(errorId: string) {
    return this.request(`/support/errors/${errorId}/resolve`, {
      method: "POST",
    })
  }

  async contactUser(userId: string, message: string) {
    return this.request(`/support/contact-user`, {
      method: "POST",
      body: JSON.stringify({ userId, message }),
    })
  }

  async retryNotification(notificationId: string) {
    return this.request(`/support/notifications/${notificationId}/retry`, {
      method: "POST",
    })
  }

  async getSystemStatus() {
    return this.request("/support/system-status")
  }

  // Product APIs
  async createProduct(data: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  async duplicateProduct(id: string) {
    return this.request(`/products/${id}/duplicate`, {
      method: "POST",
    })
  }

  async archiveProduct(id: string) {
    return this.request(`/products/${id}/archive`, {
      method: "POST",
    })
  }

  async uploadProductImages(productId: string, files: File[]) {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`image_${index}`, file)
    })

    return this.request(`/products/${productId}/images`, {
      method: "POST",
      headers: {},
      body: formData,
    })
  }

  // User APIs
  async createUser(data: any) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    })
  }

  async toggleUserStatus(id: string, status: string) {
    return this.request(`/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  async verifyUser(id: string) {
    return this.request(`/users/${id}/verify`, {
      method: "POST",
    })
  }

  async sendUserNotification(id: string, message: string) {
    return this.request(`/users/${id}/notify`, {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  }

  // Reports APIs
  async generateReport(type: string, filters: any) {
    return this.request("/reports/generate", {
      method: "POST",
      body: JSON.stringify({ type, filters }),
    })
  }

  async exportReport(type: string, format: string, filters: any) {
    return this.request("/reports/export", {
      method: "POST",
      body: JSON.stringify({ type, format, filters }),
    })
  }

  async scheduleReport(config: any) {
    return this.request("/reports/schedule", {
      method: "POST",
      body: JSON.stringify(config),
    })
  }

  async emailReport(reportId: string, recipients: string[]) {
    return this.request(`/reports/${reportId}/email`, {
      method: "POST",
      body: JSON.stringify({ recipients }),
    })
  }

  // Alerts APIs
  async setAlert(auctionId: string, config: any) {
    return this.request("/alerts", {
      method: "POST",
      body: JSON.stringify({ auctionId, ...config }),
    })
  }
}

export const apiClient = new ApiClient()
