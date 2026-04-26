<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Seed 5 sample tech services for ZE-Commerce.
     *
     * These records cover all three supported categories (ERP, Web, Apps)
     * and demonstrate the full JSON features_list structure.
     */
    public function run(): void
    {
        $services = [
            // ── ERP ─────────────────────────────────────────────────────────
            [
                'title'        => 'Custom ERP System',
                'description'  => 'A fully tailored Enterprise Resource Planning solution built around your business workflows. Covers finance, HR, procurement, inventory, and reporting in a single unified platform.',
                'category'     => 'ERP',
                'price'        => 12500.00,
                'features_list' => [
                    'Multi-company & multi-currency support',
                    'Real-time inventory tracking',
                    'Role-based access control (RBAC)',
                    'Integrated payroll & HR management',
                    'Custom reporting dashboards',
                    '1 year of free maintenance',
                ],
                'image_path'   => 'services/erp-system.webp',
            ],
            [
                'title'        => 'ERP Integration & Migration',
                'description'  => 'Seamlessly migrate your legacy data and integrate third-party APIs (accounting, CRM, logistics) into a modern ERP backbone without business disruption.',
                'category'     => 'ERP',
                'price'        => 4800.00,
                'features_list' => [
                    'Legacy data audit & cleansing',
                    'REST & SOAP API connector library',
                    'Zero-downtime migration strategy',
                    'Post-go-live support (3 months)',
                    'Staff training sessions',
                ],
                'image_path'   => 'services/erp-integration.webp',
            ],

            // ── Web ──────────────────────────────────────────────────────────
            [
                'title'        => 'E-Commerce Web Platform',
                'description'  => 'A high-performance, SEO-optimised e-commerce storefront delivered with a headless architecture, fast checkout flows, and full payment gateway integration.',
                'category'     => 'Web',
                'price'        => 3200.00,
                'features_list' => [
                    'Headless React + Laravel backend',
                    'Payment gateway integration (Stripe / PayPal)',
                    'Product catalogue with advanced filtering',
                    'Admin dashboard & analytics',
                    'Mobile-first responsive design',
                    'Core Web Vitals optimised (LCP < 2.5s)',
                ],
                'image_path'   => 'services/ecommerce-web.webp',
            ],
            [
                'title'        => 'Corporate Website & CMS',
                'description'  => 'A sleek, brand-aligned corporate website backed by a user-friendly CMS so your team can update content without touching code.',
                'category'     => 'Web',
                'price'        => 1800.00,
                'features_list' => [
                    'Custom UI/UX design',
                    'Integrated CMS (FilamentPHP)',
                    'Multi-language support',
                    'Blog & news module',
                    'SEO meta management',
                    'Contact forms with spam protection',
                ],
                'image_path'   => 'services/corporate-website.webp',
            ],

            // ── Apps ─────────────────────────────────────────────────────────
            [
                'title'        => 'Cross-Platform Mobile App',
                'description'  => 'Launch on iOS and Android simultaneously with a single React Native codebase. From MVP to enterprise-grade, we cover design, development, testing, and App Store submission.',
                'category'     => 'Apps',
                'price'        => 7500.00,
                'features_list' => [
                    'React Native (iOS + Android)',
                    'Push notifications & deep linking',
                    'Offline-first with local DB sync',
                    'CI/CD pipeline (GitHub Actions)',
                    'App Store & Play Store submission',
                    '6-month post-launch support',
                ],
                'image_path'   => 'services/mobile-app.webp',
            ],
        ];

        foreach ($services as $data) {
            Service::firstOrCreate(
                ['slug' => Str::slug($data['title'])],
                $data,
            );
        }

        $this->command->info('✅  5 tech services seeded successfully.');
    }
}
