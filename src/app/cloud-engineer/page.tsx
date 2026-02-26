import { Metadata } from 'next'
import Link from 'next/link'
import { profile } from '@/data/profile'
import { getSiteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: `Ingénieur Cloud - Portfolio ${profile.name}`,
  description: profile.bio.join(' '),
  keywords: profile.keywords,
  alternates: {
    canonical: `${getSiteUrl()}/cloud-engineer`,
  },
}

export default function CloudEngineerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ingénieur Cloud — {profile.name}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ingénieure cloud : conception, mise en œuvre et gestion d&apos;infrastructures 
            scalables sur AWS, Azure et Google Cloud Platform.
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Services d&apos;ingénierie cloud</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Architecture & conception cloud</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Architectures multi-niveaux scalables</li>
                  <li>• Microservices et serverless</li>
                  <li>• Haute disponibilité et reprise après sinistre</li>
                  <li>• Solutions cloud optimisées en coûts</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Migration cloud</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Modernisation de systèmes legacy</li>
                  <li>• Migrations lift-and-shift</li>
                  <li>• Refactoring applicatif pour le cloud</li>
                  <li>• Stratégies de migration sans interruption</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Expertise plateformes cloud</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Amazon Web Services</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>EC2, ECS, EKS, Lambda</li>
                  <li>S3, RDS, DynamoDB</li>
                  <li>VPC, CloudFront, Route 53</li>
                  <li>IAM, CloudWatch, CloudTrail</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Microsoft Azure</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Virtual Machines, AKS</li>
                  <li>Azure SQL, Cosmos DB</li>
                  <li>Azure Functions, Logic Apps</li>
                  <li>Azure AD, Key Vault</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Google Cloud Platform</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Compute Engine, GKE</li>
                  <li>Cloud Storage, BigQuery</li>
                  <li>Cloud Functions, Pub/Sub</li>
                  <li>Cloud IAM, Monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Approche ingénierie cloud</h2>
            <div className="bg-card p-6 rounded-lg border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Sécurité & conformité</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• IAM (Identity and Access Management)</li>
                    <li>• Sécurité réseau et chiffrement</li>
                    <li>• Cadres de conformité (SOC 2, RGPD)</li>
                    <li>• Monitoring et réponse aux incidents</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Performance & optimisation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Auto-scaling et répartition de charge</li>
                    <li>• Optimisation des coûts cloud</li>
                    <li>• Monitoring et tuning des perfs</li>
                    <li>• Right-sizing des ressources</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Projets cloud à la une</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-primary">Infrastructure multi-cloud</h3>
                <p className="text-muted-foreground mb-3">
                  Conception et mise en place d&apos;une architecture hybride multi-cloud (AWS et Azure) 
                  avec haute disponibilité et reprise après sinistre.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AWS</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Azure</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Terraform</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Kubernetes</span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-primary">Plateforme serverless</h3>
                <p className="text-muted-foreground mb-3">
                  Plateforme applicative 100 % serverless (AWS Lambda, API Gateway, DynamoDB) : 
                  réduction des coûts opérationnels et scalabilité améliorée.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AWS Lambda</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">API Gateway</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">DynamoDB</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">CloudFormation</span>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Construisons votre solution cloud</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Prêt à tirer parti du cloud pour votre activité ? Discutons de vos besoins et 
              définissons une stratégie cloud pour la croissance et l&apos;efficacité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300"
              >
                Démarrer votre projet cloud
              </Link>
              <Link 
                href="/#projects"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 hover:border-accent/50 transition-all duration-300"
              >
                Voir les projets cloud
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
