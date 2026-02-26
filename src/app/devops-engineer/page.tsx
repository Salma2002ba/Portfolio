import { Metadata } from 'next'
import Link from 'next/link'
import { profile } from '@/data/profile'
import { getSiteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: `Ingénieur DevOps / Cloud - ${profile.name}`,
  description: profile.bio.join(' '),
  keywords: profile.keywords,
  alternates: {
    canonical: `${getSiteUrl()}/devops-engineer`,
  },
}

export default function DevOpsEngineerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ingénieur DevOps / Cloud — {profile.name}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ingénieure DevOps : automatisation d&apos;infrastructure cloud, conteneurisation 
            et pipelines d&apos;intégration et déploiement continus (CI/CD).
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Expertise DevOps</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Plateformes cloud</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AWS (EC2, ECS, EKS, Lambda, S3, RDS)</li>
                  <li>• Azure DevOps et services cloud</li>
                  <li>• Google Cloud Platform (GCP)</li>
                  <li>• Conception d&apos;architectures multi-cloud</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Conteneurisation & orchestration</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Conteneurisation Docker</li>
                  <li>• Gestion de clusters Kubernetes</li>
                  <li>• Helm charts et gestion des déploiements</li>
                  <li>• Bonnes pratiques de sécurité des conteneurs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">CI/CD & automatisation</h2>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-muted-foreground mb-4">
                Conception et mise en place de pipelines CI/CD robustes : du commit à la mise en production, 
                en passant par les tests et le déploiement automatisé.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Outils de pipeline</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Jenkins</li>
                    <li>• GitHub Actions</li>
                    <li>• GitLab CI/CD</li>
                    <li>• Azure DevOps</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Infrastructure as Code (IaC)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Terraform</li>
                    <li>• Ansible</li>
                    <li>• CloudFormation</li>
                    <li>• Pulumi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Monitoring & observabilité</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prometheus & Grafana</li>
                    <li>• Stack ELK</li>
                    <li>• CloudWatch</li>
                    <li>• Datadog</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Pourquoi me choisir comme ingénieure DevOps ?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                En tant qu&apos;ingénieure DevOps, je m&apos;appuie sur une vision à la fois développement et opérations : 
                collaboration fluide entre les équipes, livraison logicielle plus rapide et fiable.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Infrastructure scalable :</strong> solutions cloud-native qui évoluent avec votre activité</li>
                <li>• <strong>Optimisation des coûts :</strong> gestion des ressources pour maîtriser la facture cloud</li>
                <li>• <strong>Sécurité (DevSecOps) :</strong> sécurité intégrée tout au long du pipeline</li>
                <li>• <strong>Automatisation :</strong> réduction des tâches manuelles et des erreurs</li>
                <li>• <strong>Amélioration continue :</strong> monitoring et boucles de feedback pour optimiser en continu</li>
              </ul>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Prêt à transformer votre infrastructure ?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Échangeons sur vos besoins : rationaliser vos workflows, renforcer la fiabilité des déploiements 
              et scaler votre infrastructure.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300"
            >
              Me contacter
            </Link>
          </section>
        </main>
      </div>
    </div>
  )
}