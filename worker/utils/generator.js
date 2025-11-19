// generator.js – Generate Dealer-XXXXX-XXXXX keys

// Characters allowed: A–Z and 0–9
const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Generate a block of 5 characters
export function generateBlock() {
  let block = "";
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * ALPHANUM.length);
    block += ALPHANUM[index];
  }
  return block;
}

// Generate full key: Dealer-XXXXX-XXXXX
export function generateKey() {
  const part1 = generateBlock();
  const part2 = generateBlock();

  return `Dealer-${part1}-${part2}`;
}
