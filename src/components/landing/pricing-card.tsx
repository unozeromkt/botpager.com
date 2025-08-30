// src/components/landing/pricing-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Link from 'next/link';

interface PricingCardProps {
    name: string;
    price: string;
    features: string[];
    cta: string;
    isPopular?: boolean;
}

export function PricingCard({ name, price, features, cta, isPopular = false }: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col border-2 h-full",
      isPopular ? "border-primary shadow-primary/20 shadow-lg" : "border-border"
    )}>
      {isPopular && (
        <div className="w-full py-1.5 px-4 bg-primary text-center text-sm font-semibold text-primary-foreground">
          Más Popular
        </div>
      )}
      <CardHeader className="pt-6">
        <CardTitle className="text-2xl font-bold text-center">{name}</CardTitle>
        <CardDescription className="text-center text-4xl font-bold text-card-foreground pt-4">
          {price}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          asChild
          size="lg" 
          className={cn(
            "w-full transition-colors", 
            !isPopular && "bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground"
          )}
        >
          <Link href="https://form.jotform.com/252408899499076" target="_blank">
            {cta}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
