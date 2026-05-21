import db from '@/lib/db'
import { id } from '@instantdb/react'

interface Design {
    designName: string
    designData?: object
}

interface User {
    id: string
}

export async function duplicateDesign(user: User, design: Design) {
    const newId = id()
    await db.transact(
        db.tx.desings[newId].update({
            userId: user.id,
            designName: `${design.designName} — Copy`,
            designData: design.designData ?? {},
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isDeleted: false,
            isShared: false,
        })
    )
}
