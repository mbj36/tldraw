import { Box } from '../Box'
import { Vec } from '../Vec'
import { intersectLineSegmentCircle } from '../intersect'
import { PI2, getPointOnCircle } from '../utils'
import { Geometry2d, Geometry2dOptions } from './Geometry2d'
import { getVerticesCountForLength } from './geometry-constants'

type Circle2dOpts = Omit<Geometry2dOptions, 'isClosed'> & {
	x?: number
	y?: number
	radius: number
	isFilled: boolean
}

/** @public */
export class Circle2d extends Geometry2d {
	_center: Vec
	radius: number
	x: number
	y: number

	static fromCenter(config: Circle2dOpts) {
		return new Circle2d({
			...config,
			x: (config.x ?? 0) - config.radius,
			y: (config.y ?? 0) - config.radius,
		})
	}

	constructor(public config: Circle2dOpts) {
		super({ isClosed: true, ...config })
		const { x = 0, y = 0, radius } = config
		this.x = x
		this.y = y
		this._center = new Vec(radius + x, radius + y)
		this.radius = radius
	}

	getBounds() {
		return new Box(this.x, this.y, this.radius * 2, this.radius * 2)
	}

	getVertices(): Vec[] {
		const { _center, radius } = this
		const perimeter = PI2 * radius
		const vertices: Vec[] = []
		for (let i = 0, n = getVerticesCountForLength(perimeter); i < n; i++) {
			const angle = (i / n) * PI2
			vertices.push(getPointOnCircle(_center, radius, angle))
		}
		return vertices
	}

	nearestPoint(point: Vec): Vec {
		const { _center, radius } = this
		if (_center.equals(point)) return Vec.AddXY(_center, radius, 0)
		return _center.clone().add(point.clone().sub(_center).uni().mul(radius))
	}

	hitTestLineSegment(A: Vec, B: Vec, _zoom: number): boolean {
		const { _center, radius } = this
		return intersectLineSegmentCircle(A, B, _center, radius) !== null
	}
}
