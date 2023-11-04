import pointsUpJson from '../mocks/pointsUp.json';
import pointsDownJson from '../mocks/pointsDown.json';
import { Vector2 } from 'three';

export const getPoints: (position?: string) => Promise<Vector2[]> = (position = 'UP') => {
    return new Promise((resolve) => {
        if (position === 'UP') {
            resolve(pointsUpJson.map((i: number[]) => {
                return new Vector2(i[0], i[1]);
            }))
        } else if (position === 'DOWN') {
            resolve(pointsDownJson.map((i: number[]) => {
                return new Vector2(i[0], i[1]);
            }))
        }
        resolve([]);
    })
}