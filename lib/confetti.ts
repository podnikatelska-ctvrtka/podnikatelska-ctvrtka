/**
 * Konfetti animace helper
 * Používá canvas-confetti bez npm instalace (inline implementace)
 */

export function celebrateModuleComplete() {
  // Jednoduchá konfetti animace bez external library
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
  const count = 50;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: any) {
    // Simulace konfetti pomocí motion/react (už máme nainstalované)
    // Pro production bychom použili canvas-confetti
    const particles = Math.floor(count * particleRatio);
    
    // Visual feedback - vytvoříme dočasné elementy
    for (let i = 0; i < particles; i++) {
      createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
    }
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function createConfettiParticle(color: string) {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '10px';
  particle.style.height = '10px';
  particle.style.backgroundColor = color;
  particle.style.borderRadius = '50%';
  particle.style.left = '50%';
  particle.style.top = '40%';
  particle.style.zIndex = '9999';
  particle.style.pointerEvents = 'none';
  
  document.body.appendChild(particle);
  
  // Animace
  const angle = Math.random() * 360;
  const velocity = 3 + Math.random() * 5;
  const rotation = Math.random() * 360;
  
  particle.animate([
    {
      transform: `translate(0, 0) rotate(0deg)`,
      opacity: 1
    },
    {
      transform: `translate(${Math.cos(angle) * velocity * 100}px, ${Math.sin(angle) * velocity * 100 + 200}px) rotate(${rotation}deg)`,
      opacity: 0
    }
  ], {
    duration: 1500 + Math.random() * 500,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }).onfinish = () => {
    particle.remove();
  };
}

export function celebrateLessonComplete() {
  // Menší konfetti pro dokončení lekce
  const colors = ['#3b82f6', '#10b981'];
  
  for (let i = 0; i < 20; i++) {
    createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
  }
}

export function celebrateFitScore(score: number) {
  // Speciální konfetti pro vysoký FIT score
  if (score >= 70) {
    const colors = ['#10b981', '#22c55e', '#84cc16'];
    
    for (let i = 0; i < 30; i++) {
      createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
    }
  }
}
