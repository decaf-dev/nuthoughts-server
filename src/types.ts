export type Thought = {
  creationTime: number;
  text: string;
};

export type EncryptedThought = {
  iv: string;
  encryptedData: string;
};
