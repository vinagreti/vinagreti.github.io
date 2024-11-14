export enum NOTE_STATUS {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum NOTE_GROUP_TYPE {
  REGULAR = "REGULAR",
  TODO = "TO-DO",
}

export type INote = {
  id: string;
  title: string;
  content?: string;
  created: number;
  updated: number;
  status?: NOTE_STATUS;
  check?: boolean;
};

export type INoteGroup = {
  id: string;
  title: string;
  notes: INote[];
  created: number;
  updated: number;
  dueDate?: string;
  type: NOTE_GROUP_TYPE;
  toggle?: boolean;
};
