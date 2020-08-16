export interface IDepartmentFeedback {
  department: string;
  ratings: {
    rating: number;
    time: string;
  }[];
}
