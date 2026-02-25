import { Metadata } from 'next'
import Link from 'next/link'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `Bonnes pratiques DevOps - ${profile.name}`,
  description: profile.bio.join(' '),
  keywords: profile.keywords,
  alternates: {
    canonical: `${profile.siteUrl}/blog/devops-best-practices`,
  },
  openGraph: {
    title: `Bonnes pratiques DevOps - ${profile.name}`,
    description: profile.bio.join(' '),
    type: 'article',
    authors: [profile.name],
  },
}

export default function DevOpsBestPracticesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Bonnes pratiques DevOps : guide 2024
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <span>Par {profile.name}</span>
              <span>•</span>
              <time dateTime="2024-01-15">15 janvier 2024</time>
              <span>•</span>
              <span>15 min de lecture</span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Les bonnes pratiques DevOps qui transforment votre chaîne de livraison logicielle, 
              renforcent la collaboration et accélèrent les cycles de déploiement.
            </p>
          </header>

          <main className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Qu’est-ce que le DevOps ?</h2>
              <p className="text-muted-foreground mb-4">
                Le DevOps est un mouvement culturel et technique qui privilégie la collaboration 
                entre développement et opérations. Objectif : raccourcir le cycle de vie tout en 
                livrant fonctionnalités, correctifs et mises à jour de façon fréquente et fiable.
              </p>
              <p className="text-muted-foreground">
                En tant qu’ingénieure DevOps, j’ai vu comment la bonne approche transforme 
                les workflows de développement et de déploiement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">1. Intégration et déploiement continus (CI/CD)</h2>
              <div className="bg-card p-6 rounded-lg border mb-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Fondamentaux d’un pipeline CI/CD</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Tests automatisés :</strong> unitaires, d’intégration et e2e</li>
                  <li><strong>Portes de qualité :</strong> analyse de code (ex. SonarQube)</li>
                  <li><strong>Déploiements automatisés :</strong> staging et production</li>
                  <li><strong>Stratégies de rollback :</strong> blue-green ou canary</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Un pipeline CI/CD bien conçu est la colonne vertébrale du DevOps : tests, validation 
                et déploiement automatisés, moins d’erreurs manuelles, livraison accélérée.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">2. Infrastructure as Code (IaC)</h2>
              <p className="text-muted-foreground mb-6">
                L’IaC gère l’infrastructure comme du code : versioning, tests et automatisation.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Outils IaC</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Terraform :</strong> provisionnement multi-cloud</li>
                    <li>• <strong>Ansible :</strong> gestion de configuration et automatisation</li>
                    <li>• <strong>CloudFormation :</strong> templates AWS</li>
                    <li>• <strong>Pulumi :</strong> infra en langages de programmation</li>
                  </ul>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Bénéfices de l’IaC</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Environnements reproductibles (dev, staging, prod)</li>
                    <li>• Changements versionnés et traçables</li>
                    <li>• Provisionnement et scaling plus rapides</li>
                    <li>• Moins de dérive de configuration</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">3. Conteneurisation et orchestration</h2>
              <p className="text-muted-foreground mb-6">
                Les conteneurs offrent des environnements reproductibles et portables ; 
                l’orchestration (Kubernetes, etc.) gère leur cycle de vie à l’échelle.
              </p>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Bonnes pratiques conteneurs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Docker</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Builds multi-étapes</li>
                      <li>• Réduction des couches d’image</li>
                      <li>• Tags d’image explicites</li>
                      <li>• Health checks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Kubernetes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Namespaces pour l’isolation</li>
                      <li>• Limites de ressources (requests/limits)</li>
                      <li>• ConfigMaps et Secrets</li>
                      <li>• Monitoring et observabilité</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">4. Monitoring et observabilité</h2>
              <p className="text-muted-foreground mb-6">
                Un bon monitoring donne de la visibilité sur les perfs, l’expérience utilisateur 
                et les incidents avant qu’ils n’impactent la production.
              </p>
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Les trois piliers de l’observabilité</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Métriques</h4>
                      <p className="text-sm text-muted-foreground">Données quantitatives sur les performances</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Logs</h4>
                      <p className="text-sm text-muted-foreground">Traces détaillées des événements système</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Traces</h4>
                      <p className="text-sm text-muted-foreground">Parcours des requêtes dans les systèmes distribués</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">5. Sécurité dans le DevOps (DevSecOps)</h2>
              <p className="text-muted-foreground mb-6">
                La sécurité doit être intégrée tout au long du pipeline (dev et déploiement), 
                et non en dernier recours.
              </p>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Pratiques DevSecOps</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Analyse statique du code :</strong> détection de vulnérabilités en amont</li>
                  <li><strong>Sécurité des conteneurs :</strong> scan des images (CVE, etc.)</li>
                  <li><strong>Sécurité de l’infra :</strong> politiques dans l’IaC</li>
                  <li><strong>Sécurité à l’exécution :</strong> monitoring applicatif et infra en prod</li>
                  <li><strong>Conformité automatisée :</strong> contrôles et reporting (SOC 2, RGPD…)</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Conclusion</h2>
              <p className="text-muted-foreground mb-6">
                Mettre en œuvre ces bonnes pratiques demande de l’engagement, un plan et une adoption 
                progressive. Commencez par les fondamentaux (CI/CD), puis intégrez monitoring avancé 
                et automatisation de la sécurité.
              </p>
              <p className="text-muted-foreground">
                Le DevOps ne se résume pas aux outils : c’est une culture, la collaboration et 
                l’amélioration continue. L’objectif est une chaîne de livraison logicielle durable, 
                efficace et fiable.
              </p>
            </section>

            <section className="text-center bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Besoin d’aide pour mettre en place le DevOps ?</h2>
              <p className="text-muted-foreground mb-6">
                En tant qu’ingénieure DevOps, je peux vous accompagner dans l’adoption de ces pratiques. 
                Parlons de vos besoins et de vos défis.
              </p>
              <Link 
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300"
              >
                Échanger (consultation DevOps)
              </Link>
            </section>
          </main>
        </article>
      </div>
    </div>
  )
}