
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, RotateCcw, Settings, Volume2, Plus } from 'lucide-react';
import DepositModal from './DepositModal';

interface SlotMachineProps {
  user: {
    name: string;
    email: string;
    currency: string;
  };
  balance: number;
  setBalance: (balance: number) => void;
  onLogout: () => void;
}

const SlotMachine = ({ user, balance, setBalance, onLogout }: SlotMachineProps) => {
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍋', '🍒']);
  const [lastWin, setLastWin] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🔔', '7️⃣'];
  const symbolValues = {
    '🍒': 2,
    '🍋': 3,
    '🍊': 4,
    '🍇': 5,
    '⭐': 10,
    '💎': 20,
    '🔔': 50,
    '7️⃣': 100
  };

  const calculateWin = (reelResult: string[]) => {
    // Three of a kind
    if (reelResult[0] === reelResult[1] && reelResult[1] === reelResult[2]) {
      const symbol = reelResult[0] as keyof typeof symbolValues;
      return bet * symbolValues[symbol];
    }
    
    // Two of a kind (smaller payout)
    if (reelResult[0] === reelResult[1] || reelResult[1] === reelResult[2] || reelResult[0] === reelResult[2]) {
      const symbol = reelResult[0] as keyof typeof symbolValues;
      return Math.floor(bet * symbolValues[symbol] * 0.3);
    }
    
    return 0;
  };

  const handleDeposit = (amount: number) => {
    setBalance(balance + amount);
    setShowDeposit(false);
  };

  const spin = async () => {
    if (balance < bet) {
      alert('Insufficient balance! Please make a deposit to continue playing.');
      return;
    }

    setIsSpinning(true);
    setBalance(prev => prev - bet);
    setSpinCount(prev => prev + 1);

    // Simulate spinning animation
    const spinDuration = 2000;
    const intervalId = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      
      // Final result
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(finalReels);
      
      const winAmount = calculateWin(finalReels);
      if (winAmount > 0) {
        setBalance(prev => prev + winAmount);
        setLastWin(winAmount);
        setTotalWins(prev => prev + winAmount);
      } else {
        setLastWin(0);
      }
      
      setIsSpinning(false);
    }, spinDuration);
  };

  return (
    <div className="min-h-screen casino-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gold-text">Ryan's Royal Reels</h1>
            <p className="text-amber-200">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <Volume2 className="h-6 w-6 text-yellow-400" />
            <Settings className="h-6 w-6 text-yellow-400" />
            <Button onClick={onLogout} variant="outline" className="border-yellow-600">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                R {balance.toFixed(2)}
              </div>
              <div className="text-sm text-amber-200">Balance</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                R {totalWins.toFixed(2)}
              </div>
              <div className="text-sm text-amber-200">Total Wins</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {spinCount}
              </div>
              <div className="text-sm text-amber-200">Spins</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {spinCount > 0 ? Math.round((totalWins / (spinCount * bet)) * 100) : 0}%
              </div>
              <div className="text-sm text-amber-200">RTP</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-600/30">
            <CardContent className="p-4 text-center">
              <Button
                onClick={() => setShowDeposit(true)}
                className="gold-gradient text-black font-bold w-full h-full flex flex-col justify-center items-center"
              >
                <Plus className="h-6 w-6 mb-1" />
                <span className="text-sm">Add Funds</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Slot Machine */}
        <Card className="bg-black/60 border-yellow-600/50 backdrop-blur-md mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl gold-text">🎰 RYAN'S ROYAL REELS 🎰</CardTitle>
            {lastWin > 0 && (
              <Badge className="gold-gradient text-black text-lg px-4 py-2">
                🎉 YOU WON R {lastWin.toFixed(2)}! 🎉
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-8">
            {/* Slot Reels */}
            <div className="flex justify-center mb-8">
              <div className="bg-black/80 rounded-xl p-6 border-4 border-yellow-400 reel-glow">
                <div className="flex space-x-4">
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      className={`w-24 h-24 bg-white rounded-lg flex items-center justify-center text-5xl border-4 border-yellow-300 ${
                        isSpinning ? 'slot-spin' : ''
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Betting Controls */}
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setBet(Math.max(1, bet - 5))}
                  disabled={isSpinning}
                  variant="outline"
                  className="border-yellow-600"
                >
                  -R5
                </Button>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">R {bet}</div>
                  <div className="text-sm text-amber-200">Bet Amount</div>
                </div>
                <Button
                  onClick={() => setBet(Math.min(100, bet + 5))}
                  disabled={isSpinning}
                  variant="outline"
                  className="border-yellow-600"
                >
                  +R5
                </Button>
              </div>

              <Button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-2xl px-16 py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {isSpinning ? (
                  <div className="flex items-center">
                    <RotateCcw className="h-6 w-6 mr-2 animate-spin" />
                    SPINNING...
                  </div>
                ) : (
                  '🎰 SPIN 🎰'
                )}
              </Button>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setBet(1)}
                  disabled={isSpinning}
                  variant="outline"
                  className="border-yellow-600"
                >
                  Min Bet
                </Button>
                <Button
                  onClick={() => setBet(Math.min(100, Math.floor(balance / 10)))}
                  disabled={isSpinning}
                  variant="outline"
                  className="border-yellow-600"
                >
                  Max Bet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paytable */}
        <Card className="bg-black/40 border-yellow-600/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-center">💰 PAYTABLE 💰</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {Object.entries(symbolValues).map(([symbol, multiplier]) => (
                <div key={symbol} className="text-amber-200">
                  <div className="text-3xl mb-2">{symbol}</div>
                  <div className="text-sm">
                    3x = {multiplier}x bet<br/>
                    2x = {Math.floor(multiplier * 0.3)}x bet
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
};

export default SlotMachine;
