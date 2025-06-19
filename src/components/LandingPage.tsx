
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Coins, Trophy, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen casino-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-8xl">♠</div>
        <div className="absolute top-40 right-20 text-6xl">♥</div>
        <div className="absolute bottom-40 left-20 text-7xl">♦</div>
        <div className="absolute bottom-20 right-10 text-9xl">♣</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-16 w-16 text-yellow-400 mr-4" />
            <h1 className="text-6xl font-bold gold-text">
              Ryan's Royal Reels
            </h1>
            <Crown className="h-16 w-16 text-yellow-400 ml-4" />
          </div>
          <p className="text-2xl text-amber-200 mb-8 max-w-3xl mx-auto">
            Experience the thrill of South Africa's most prestigious online casino. 
            Spin the reels and win big with our premium slot machines!
          </p>
          <div className="flex items-center justify-center space-x-2 text-amber-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
            <span className="ml-2 text-lg">Rated #1 Casino in SA</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-black/40 border-yellow-600/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="text-center">
              <Coins className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-yellow-400">ZAR Currency</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-amber-200 text-center">
                Play with South African Rand. Secure deposits and instant withdrawals to local banks.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-yellow-600/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-yellow-400">Big Jackpots</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-amber-200 text-center">
                Progressive jackpots reaching millions of Rand. Your next spin could change your life!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-yellow-600/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="text-center">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <CardTitle className="text-yellow-400">VIP Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-amber-200 text-center">
                Exclusive bonuses, personal account managers, and premium support for our valued players.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Current Jackpot */}
        <div className="text-center mb-16">
          <Card className="max-w-md mx-auto bg-gradient-to-r from-yellow-600/20 to-red-600/20 border-yellow-400 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl gold-text">Current Jackpot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-green-400 mb-2">
                R {(Math.random() * 5000000 + 1000000).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-amber-200">Growing every second!</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold text-xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🎰 Start Playing Now 🎰
          </Button>
          <p className="text-sm text-amber-300 mt-4">
            18+ Only. Please gamble responsibly.
          </p>
        </div>

        {/* License info */}
        <div className="text-center mt-16 text-amber-300/60">
          <p>Licensed and regulated by the Western Cape Gambling Board</p>
          <p>SSL Encrypted • Responsible Gaming • Fair Play Certified</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
