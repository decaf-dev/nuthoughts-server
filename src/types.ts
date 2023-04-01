export type Thought = {
  creationTime: number;
  text: string;
};

export type EncryptedThought = {
  nonce: string;
  cipherText: string;
  mac: string;
};
