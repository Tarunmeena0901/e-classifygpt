// export type CATEGORIZED_EMAILS = {
//     important: {subject: string , from: string, important: boolean}[];
//     general:  {subject: string , from: string, important: boolean}[];
//   };

export type CATEGORIZED_EMAILS = {
  subject: string,
  from: string,
  important: boolean
}[];

export type EMAIL = {
  id: string,
  subject: string,
  from: string
}