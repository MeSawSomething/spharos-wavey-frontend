export interface paymentRequestBodyType {
  uuid: string
  vehicleId: number
  carName: string
  carBrandName: string
  startDate: string
  endDate: string
  startZone: number
  returnZone: number
  price: number
  insuranceId: number
  reward: number
}