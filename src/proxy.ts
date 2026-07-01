import { NextRequest, NextResponse } from "next/server";

export type IRole = 'ADMIN' | 'USER'
export interface IUser {
    username: string
    role: IRole
    no_telpon: string
}

export function proxy (request: NextRequest) { 
    const userCookie = request.cookies.get("user")?.value;

    const {pathname} = request.nextUrl
    console.log(pathname)
    const toUserPage = pathname.startsWith('/user')
    const toAdminPage = pathname.startsWith('/admin')
    const isNeedSessoin = toUserPage || toAdminPage

    if(isNeedSessoin) {
        if(!userCookie) {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }
    

        const user = JSON.parse(userCookie) as IUser

            if (toAdminPage && user.role !== 'ADMIN') 
                return NextResponse.redirect(new URL('/', request.nextUrl))
            if (toUserPage && user.role !== 'USER') {
                return NextResponse.redirect(new URL('/', request.nextUrl))
     }
        return NextResponse.next()
    }
} 