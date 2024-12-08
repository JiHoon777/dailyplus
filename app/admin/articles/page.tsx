'use client'
import { Button } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'

export default function ArticlesPage() {
  return (
    <PageBase className="gap-6">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Manage Aritlces</h3>
        <Button>Create Article With Ai</Button>
      </div>
    </PageBase>
  )
}
