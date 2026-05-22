interface ReviewType {
  fullName: string;
  email: string;
  date: string;
  rating: number;
  review: string;
}

export type { ReviewType };

export interface IReporter {
  _id: string;
  fullName: string;
  email: string;
  role: "guest" | "host" | "user" | "admin";
  profileImage: string;
}

export interface IReportedUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage: string;
}

export interface IReportedCar {
  _id: string;
  name: string;
  model: string;
  // Add other car properties
}

export interface IReport {
  _id: string;
  reporter: IReporter;
  reportedUser: IReportedUser;
  reportedCar: IReportedCar | string;
  role: "guest" | "host" | "user" | "admin";
  status: "New" | "Resolving" | "Reviewing";
  reason: string;
  reasonText: string;
  createdAt: string;
  updatedAt: string;
}
