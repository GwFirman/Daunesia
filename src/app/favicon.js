// This ensures Next.js recognizes and processes the favicon
export const size = {
  width: 32,
  height: 32,
};
 
export const contentType = 'image/x-icon';
 
// Using a base64 encoded string is another option
export default function Icon() {
  // Return null to let Next.js use the static file
  return null;
}
