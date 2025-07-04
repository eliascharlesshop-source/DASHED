// Solana blockchain integration service
import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js'

interface SolanaConfig {
  rpcUrl: string
  network: 'mainnet-beta' | 'testnet' | 'devnet'
  privateKey?: string
}

class SolanaService {
  private connection: Connection
  private network: string
  private keypair?: Keypair

  constructor(config: SolanaConfig) {
    this.connection = new Connection(config.rpcUrl, 'confirmed')
    this.network = config.network
    
    if (config.privateKey) {
      const secretKey = Uint8Array.from(JSON.parse(config.privateKey))
      this.keypair = Keypair.fromSecretKey(secretKey)
    }
  }

  // Get wallet balance
  async getBalance(publicKey: string): Promise<number> {
    try {
      const balance = await this.connection.getBalance(new PublicKey(publicKey))
      return balance / 1e9 // Convert lamports to SOL
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`)
    }
  }

  // Register device on blockchain
  async registerDevice(
    deviceId: string,
    ownerPublicKey: string,
    deviceMetadata: any
  ): Promise<{ signature: string; blockHeight: number }> {
    try {
      if (!this.keypair) {
        throw new Error('Service keypair not configured')
      }

      // Create a simple transaction to record device registration
      // In production, this would use a custom program
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.keypair.publicKey,
          toPubkey: new PublicKey(ownerPublicKey),
          lamports: 1000, // Minimal SOL amount for registration
        })
      )

      // Add device metadata as memo (simplified approach)
      const memo = JSON.stringify({
        action: 'DEVICE_REGISTRATION',
        deviceId,
        metadata: deviceMetadata,
        timestamp: Date.now()
      })

      // In production, you'd use the Memo program
      // For now, we'll just send the transaction
      const signature = await this.connection.sendTransaction(transaction, [this.keypair])
      
      // Wait for confirmation
      await this.connection.confirmTransaction(signature)
      
      // Get block height
      const blockHeight = await this.connection.getBlockHeight()

      return { signature, blockHeight }
    } catch (error) {
      throw new Error(`Failed to register device: ${error}`)
    }
  }

  // Transfer device ownership
  async transferDeviceOwnership(
    deviceId: string,
    fromPublicKey: string,
    toPublicKey: string
  ): Promise<{ signature: string; blockHeight: number }> {
    try {
      if (!this.keypair) {
        throw new Error('Service keypair not configured')
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(fromPublicKey),
          toPubkey: new PublicKey(toPublicKey),
          lamports: 1000,
        })
      )

      const memo = JSON.stringify({
        action: 'DEVICE_OWNERSHIP_TRANSFER',
        deviceId,
        from: fromPublicKey,
        to: toPublicKey,
        timestamp: Date.now()
      })

      const signature = await this.connection.sendTransaction(transaction, [this.keypair])
      await this.connection.confirmTransaction(signature)
      
      const blockHeight = await this.connection.getBlockHeight()

      return { signature, blockHeight }
    } catch (error) {
      throw new Error(`Failed to transfer device ownership: ${error}`)
    }
  }

  // Verify transaction
  async verifyTransaction(signature: string): Promise<boolean> {
    try {
      const status = await this.connection.getSignatureStatus(signature)
      return status.value?.confirmationStatus === 'confirmed' || 
             status.value?.confirmationStatus === 'finalized'
    } catch (error) {
      throw new Error(`Failed to verify transaction: ${error}`)
    }
  }

  // Get transaction details
  async getTransaction(signature: string): Promise<any> {
    try {
      const transaction = await this.connection.getTransaction(signature)
      return transaction
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error}`)
    }
  }

  // Process payment transaction
  async processPayment(
    fromPublicKey: string,
    toPublicKey: string,
    amount: number, // in SOL
    orderId: string
  ): Promise<{ signature: string; blockHeight: number }> {
    try {
      if (!this.keypair) {
        throw new Error('Service keypair not configured')
      }

      const lamports = amount * 1e9 // Convert SOL to lamports

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(fromPublicKey),
          toPubkey: new PublicKey(toPublicKey),
          lamports,
        })
      )

      const memo = JSON.stringify({
        action: 'PAYMENT',
        orderId,
        amount,
        timestamp: Date.now()
      })

      const signature = await this.connection.sendTransaction(transaction, [this.keypair])
      await this.connection.confirmTransaction(signature)
      
      const blockHeight = await this.connection.getBlockHeight()

      return { signature, blockHeight }
    } catch (error) {
      throw new Error(`Failed to process payment: ${error}`)
    }
  }

  // Get network info
  async getNetworkInfo(): Promise<{
    network: string
    blockHeight: number
    epoch: number
  }> {
    try {
      const blockHeight = await this.connection.getBlockHeight()
      const epochInfo = await this.connection.getEpochInfo()
      
      return {
        network: this.network,
        blockHeight,
        epoch: epochInfo.epoch
      }
    } catch (error) {
      throw new Error(`Failed to get network info: ${error}`)
    }
  }
}

// Export singleton instance
export const solanaService = new SolanaService({
  rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  network: (process.env.NEXT_PUBLIC_SOLANA_NETWORK as any) || 'devnet',
  privateKey: process.env.SOLANA_PRIVATE_KEY
})

export default SolanaService
