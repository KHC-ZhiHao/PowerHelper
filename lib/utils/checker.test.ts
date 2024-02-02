import { expect } from 'chai'
import { checker } from './checker'

const { inputAccept } = checker

describe('Checker', () => {
    it('inputAccept basic', function() {
        const result = inputAccept('image/*', 'image/jpeg', 'test.jpg')
        expect(result).eq(true)
    })
    it('inputAccept basic2', function() {
        const result = inputAccept('image/*', 'image/jpeg')
        expect(result).eq(true)
    })
    it('inputAccept basic fail', function() {
        const result = inputAccept('image/*', 'audio/mpeg', 'test.mp3')
        expect(result).eq(false)
    })
    it('inputAccept basic2 fail', function() {
        const result = inputAccept('image/*', 'audio/mpeg')
        expect(result).eq(false)
    })
    it('inputAccept ext', function() {
        const result = inputAccept('.jpg', 'image/jpeg', 'test.jpg')
        expect(result).eq(true)
    })
    it('inputAccept more ext', function() {
        const result = inputAccept('.png,.jpg', 'image/jpeg', 'test.jpg')
        expect(result).eq(true)
    })
    it('inputAccept all', function() {
        const result = inputAccept('*/*', 'image/jpeg', 'test.jpg')
        expect(result).eq(true)
    })
    it('inputAccept mp3', function() {
        const result = inputAccept('.mp3', 'audio/mpeg', 'test.mp3')
        expect(result).eq(true)
    })
})
