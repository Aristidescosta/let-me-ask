import { getDatabase, ref } from "firebase/database"

export const getDatabaseRef = (roomReference?: string) =>{
  const database = getDatabase()
  return ref(database, roomReference)
}