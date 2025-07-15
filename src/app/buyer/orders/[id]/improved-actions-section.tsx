"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Send } from "lucide-react";

// Replace the Actions section with this improved version:
export function ImprovedActionsSection({
  sellerEmail,
  order,
  subject,
  setSubject,
  message,
  setMessage,
  handleSend,
  sending,
}: {
  sellerEmail: string | null;
  order: any;
  subject: string;
  setSubject: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  handleSend: () => void;
  sending: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Order Confirmation Form - Only show when delivered */}
      {order.status === "DELIVERED" && (
        <Card className="bg-gradient-to-br from-green-900/20 to-gray-800 border-green-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Confirm Order Received
            </CardTitle>
            <CardDescription className="text-gray-300">
              Let the seller know you've received your order and share your
              experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email-subject"
                  className="text-sm font-medium text-gray-200"
                >
                  Subject
                </Label>
                <Input
                  id="email-subject"
                  type="text"
                  placeholder="e.g., Order received - Thank you!"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email-message"
                  className="text-sm font-medium text-gray-200"
                >
                  Message
                </Label>
                <Textarea
                  id="email-message"
                  placeholder="Share your experience with this order..."
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500/20 transition-all duration-200 min-h-[100px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <Separator className="bg-gray-600" />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleSend}
                disabled={sending || !subject.trim() || !message.trim()}
                className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 flex-1 sm:flex-none"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Confirmation
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 bg-transparent"
                onClick={() => {
                  setSubject("");
                  setMessage("");
                }}
              >
                Clear Form
              </Button>
            </div>

            {(!subject.trim() || !message.trim()) && (
              <p className="text-sm text-amber-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Please fill out both subject and message fields
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Order Status Badge */}
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm border-gray-600 text-gray-400"
        >
          Order #{order.orderNumber} •{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </Badge>
      </div>
    </div>
  );
}
