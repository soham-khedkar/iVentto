const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteEventsCollectionId: String(import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID),
  appwriteRegistrationsCollectionId: String(import.meta.env.VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID),
  appwriteCategoriesCollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

export default conf;
