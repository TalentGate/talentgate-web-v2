import { Building } from 'lucide-react';

function Header() {
  return (
    <header className="flex flex-col justify-center items-center gap-4">
      <Building className="size-10" />
      <h1 className="text-4xl font-bold">Welcome to TalentGate</h1>
      <p className="text-muted-foreground">Your journey to smarter hiring starts here.</p>
    </header>
  );
}

export default Header;
