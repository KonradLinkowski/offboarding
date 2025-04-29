type Equipment = {
  id: string;
  name: string;
};

export type Employee = {
  id: string;
  name: string;
  department: string;
  status: string;
  email: string;
  equipments: Equipment[];
};
