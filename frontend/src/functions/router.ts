import { AuthRoutes } from "../router/AuthRoutes"

export const getRoute = (name: string, id?: number) => {
    const targetRoute = AuthRoutes.find(route => route.name == name)!

    if (targetRoute.path.includes(':id')) {
        return targetRoute.path.replace(':id', String(id))
    }
    return targetRoute.path
}