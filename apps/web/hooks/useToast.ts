import { toast as sonnerToast } from "sonner";

export function useToast() {
  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    if (variant === "destructive") {
      return sonnerToast.error(title, { description });
    }
    return sonnerToast.success(title, { description });
  };

  return { toast };
}
