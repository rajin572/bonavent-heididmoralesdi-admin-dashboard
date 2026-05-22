export interface IHost {
  _id: string;
  fullName: string;
  email: string;
  role: "host" | "user" | "admin"; // Adjust based on your role types
  profileImage: string;
  isBlocked: boolean;
  createdAt: string; // or Date if you parse it
  averageRating: number;
  totalVehicle: number;
  totalTrip: number;
}
export interface IGuest {
  _id: string;
  fullName: string;
  email: string;
  role: "guest" | "host" | "user" | "admin";
  profileImage: string;
  isBlocked: boolean;
  createdAt: string; // or Date if you parse it
  rating: number;
  totalTrip: number;
}
