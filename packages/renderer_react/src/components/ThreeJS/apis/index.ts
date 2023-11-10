import pointsUpJson from '../mocks/pointsUp.json';
import pointsDownJson from '../mocks/pointsDown.json';
import points from '../mocks/points.json';
import { Vector2 } from 'three';

export const getPoints: (position?: string) => Promise<Vector2[]> = (position = '') => {
    return new Promise((resolve) => {
        if (position === 'UP') {
            resolve(pointsUpJson.map((i: number[]) => {
                return new Vector2(i[1], i[0]);
            }))
        } else if (position === 'DOWN') {
            resolve(pointsDownJson.map((i: number[]) => {
                return new Vector2(i[1], i[0]);
            }))
        }
        const delta = (points.map((i: number[]) => i[0])).reduce((a, b) => a + b) / points.length;
        resolve(points.map((i: number[]) => {
            // console.log(i[0])
            return new Vector2(i[1] + 1500, i[0] - delta);
        }));
    })
}