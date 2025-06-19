
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Banknote } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const DepositModal = ({ isOpen, onClose, onDeposit }: DepositModalProps) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    if (!amount || amount < 50) {
      alert('Minimum deposit is R50');
      return;
    }

    if (amount > 50000) {
      alert('Maximum deposit is R50,000');
      return;
    }

    setIsLoading(true);
    
    // Simulate deposit processing
    setTimeout(() => {
      onDeposit(amount);
      setIsLoading(false);
      onClose();
      setDepositAmount('');
    }, 2000);
  };

  const handleQuickAmount = (amount: number) => {
    setDepositAmount(amount.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/90 border-yellow-600/30 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gold-text text-center">Make a Deposit</DialogTitle>
          <DialogDescription className="text-amber-200 text-center">
            Add funds to start playing at Ryan's Royal Reels
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-transparent border-none">
          <CardHeader className="text-center">
            <Banknote className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
            <CardTitle className="text-yellow-400">Fund Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-6">
              {/* Quick Amount Buttons */}
              <div>
                <Label className="text-amber-200 mb-3 block">Quick Select Amount</Label>
                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      className="border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/20"
                      onClick={() => handleQuickAmount(amount)}
                    >
                      R{amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <Label htmlFor="depositAmount" className="text-amber-200">Custom Amount (ZAR)</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  placeholder="Enter amount (Min: R50, Max: R50,000)"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-black/50 border-yellow-600/30 text-white text-lg"
                  min="50"
                  max="50000"
                  required
                />
              </div>

              {/* Payment Method Display */}
              <div className="bg-black/30 rounded-lg p-4 border border-yellow-600/30">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-amber-200 font-semibold">Payment Method</span>
                </div>
                <p className="text-gray-300 text-sm">•••• •••• •••• 3456</p>
                <p className="text-gray-400 text-xs">Visa ending in 3456</p>
              </div>

              {/* Terms */}
              <div className="text-xs text-amber-300/80">
                <p>• Minimum deposit: R50</p>
                <p>• Maximum deposit: R50,000</p>
                <p>• Funds will be available immediately</p>
                <p>• All transactions are secured with 256-bit SSL encryption</p>
              </div>

              <Button
                type="submit"
                className="w-full gold-gradient text-black font-bold text-lg py-3"
                disabled={isLoading || !depositAmount}
              >
                {isLoading ? "Processing..." : `Deposit R${depositAmount || '0'}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-amber-300/60">
          Secure payment processing • Licensed operator • Responsible gaming
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
