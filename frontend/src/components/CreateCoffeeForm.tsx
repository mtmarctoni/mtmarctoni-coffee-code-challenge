"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createCoffee } from "@/services/coffeeApi";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import CategoryToggle from "@/components/CategoryToggle";
import Toast from "@/components/Toast";
import { ErrorIcon } from "@/components/icons";
import { CoffeeCategoryType, CreateCoffeeItemSchema } from "@/types/Item";
import { initialCoffeeValues, ERROR_TTL } from "@/app/config";
import { useField } from "../hooks/useField";

export default function CreateCoffeeForm(): JSX.Element {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const title = useField<string>(initialCoffeeValues.title);
  const description = useField<string>(initialCoffeeValues.description);
  const price = useField<number>(initialCoffeeValues.price);
  const imageUrl = useField<string>(initialCoffeeValues.imageUrl);
  const [category, setCategory] = useState<CoffeeCategoryType>(
    initialCoffeeValues.category
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // useEffect to show the error only 5 seconds
  useEffect(() => {
    if (fieldErrors) {
      const timer = setTimeout(() => {
        setFieldErrors({});
      }, ERROR_TTL);
      return () => clearTimeout(timer);
    }
  }, [fieldErrors]);
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
    setFieldErrors({});

    // Build payload from useField values
    const payload = {
      title: title.value,
      description: description.value,
      price: price.value,
      imageUrl: imageUrl.value,
      category,
    };

    // Validate with zod schema
    const validation = CreateCoffeeItemSchema.safeParse(payload);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      await createCoffee(payload);
      router.push("/");
    } catch (err: any) {
      setApiError(err?.message || "Failed to create coffee");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDiscard = () => {
    router.push("/");
  };

  const isFormFilled =
    title.value.trim() !== "" &&
    imageUrl.value.trim() !== "" &&
    price.value !== 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  };

  return (
    <>
      {/* Toast for API errors */}
      <Toast
        message={apiError || ""}
        isVisible={!!apiError}
        onClose={() => setApiError(null)}
      />

      <motion.form 
        onSubmit={submit} 
        className="w-full px-0 pt-8 md:py-8 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Field validation errors with animations */}
        <AnimatePresence>
          {Object.keys(fieldErrors).length > 0 && (
            <motion.div 
              className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-2"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20 
              }}
            >
              {Object.entries(fieldErrors).map(([field, message], index) => (
                <motion.div
                  key={field}
                  className="flex items-center gap-2 text-error text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ErrorIcon className="w-4 h-4 text-error" />
                  </motion.div>
                  <span className="capitalize">{field}:</span>
                  <span>{message}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="flex items-start gap-4 w-full" variants={itemVariants}>
          <div className="flex-1">
            <InputField
              label="Name"
              placeholder="Name your coffee here"
              value={title.value}
              onChange={title.onChange}
              required
            />
          </div>

          <div className="w-28 flex-shrink-0">
            <InputField
              label="Price"
              placeholder="0.00"
              value={price.value}
              onChange={price.onChange}
              type="number"
              rightSymbol="€"
              required
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CategoryToggle value={category} onChange={setCategory} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField
            label="Upload image"
            placeholder="Paste image URL here"
            value={imageUrl.value}
            onChange={imageUrl.onChange}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <InputField
            label="Description"
            placeholder="Add a description"
            value={description.value}
            onChange={description.onChange}
            type="textarea"
          />
        </motion.div>
        
        <div className="h-10 md:h-0"></div>
        
        <motion.div 
          className="flex md:flex-row flex-col items-center justify-center gap-6 mt-2"
          variants={itemVariants}
        >
          <motion.button
            type="button"
            className="px-6 py-2 w-full md:w-auto rounded-full text-sm border border-accent text-text bg-transparent hover:bg-accent/10 hover:scale-105 transition-all duration-300"
            onClick={onDiscard}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Discard
          </motion.button>

          <motion.button
            type="submit"
            disabled={isSubmitting || !isFormFilled}
            className="px-6 py-2 w-full md:w-auto rounded-full text-sm font-semibold bg-accent text-text transition-all duration-300 relative overflow-hidden disabled:opacity-50 shadow-2xl shadow-accent/40"
            whileHover={{ 
              scale: isSubmitting ? 1 : 1.05, 
              boxShadow: "0 10px 25px -5px #BA803980" 
            }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating...
                </motion.div>
              ) : (
                <motion.span
                  key="confirm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Confirm
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.form>
    </>
  );
}
