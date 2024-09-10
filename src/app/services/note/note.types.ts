export enum NOTE_STATUS {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum NOTE_GROUP_TYPE {
  REGULAR = "REGULAR",
  TODO = "TODO",
}

export type INote = {
  id: string;
  title: string;
  content: string;
  status?: NOTE_STATUS;
};

export type INoteGroup = {
  id: string;
  title: string;
  notes: INote[];
  type: NOTE_GROUP_TYPE;
};
