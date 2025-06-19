
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (userData: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        currency: "ZAR"
      };
      onAuthenticated(userData);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      const userData = {
        name: "New Player",
        email: "newplayer@example.com",
        currency: "ZAR"
      };
      onAuthenticated(userData);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/90 border-yellow-600/30 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gold-text text-center">Join Ryan's Royal Reels</DialogTitle>
          <DialogDescription className="text-amber-200 text-center">
            Sign in to start your casino adventure
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
            <TabsTrigger value="login" className="data-[state=active]:bg-yellow-600">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-yellow-600">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-transparent border-none">
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                <CardTitle className="text-yellow-400">Welcome Back</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-amber-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-black/50 border-yellow-600/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-amber-200">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-black/50 border-yellow-600/30 text-white"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gold-gradient text-black font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-transparent border-none">
              <CardHeader className="text-center">
                <CreditCard className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                <CardTitle className="text-yellow-400">Create Account</CardTitle>
                <CardDescription className="text-green-400 font-semibold">
                  🎁 Ready to make your first deposit!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-amber-200">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-black/50 border-yellow-600/30 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-amber-200">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-black/50 border-yellow-600/30 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signupEmail" className="text-amber-200">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-black/50 border-yellow-600/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signupPassword" className="text-amber-200">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-black/50 border-yellow-600/30 text-white"
                      required
                    />
                  </div>

                  {/* Card Details Section */}
                  <div className="border-t border-yellow-600/30 pt-4">
                    <div className="flex items-center mb-4">
                      <Shield className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-amber-200 font-semibold">Secure Payment Details</span>
                    </div>
                    <div>
                      <Label htmlFor="cardNumber" className="text-amber-200">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-black/50 border-yellow-600/30 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="expiry" className="text-amber-200">Expiry</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-black/50 border-yellow-600/30 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-amber-200">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="bg-black/50 border-yellow-600/30 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-amber-300">
                    <Lock className="h-4 w-4" />
                    <span>256-bit SSL encryption ensures your data is secure</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gold-gradient text-black font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-amber-300/60 mt-4">
          By signing up, you agree to our Terms & Conditions and confirm you are 18+
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
