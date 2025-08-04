import { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextType {
	image: File | null;
	setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageContext = createContext<ImageContextType | null>(null);

export function ImageProvider({ children }: { children: ReactNode }) {
	const [image, setImage] = useState<File | null>(null);

	return <ImageContext.Provider value={{ image, setImage }}>{children}</ImageContext.Provider>;
}

export const useImage = () => {
	const context = useContext(ImageContext);
	if (!context) throw new Error("useImage must be used within an ImageProvider");
	return context;
};
