import { Component } from '@angular/core'
import { Question } from 'src/app/models/question.model'
import { QuestionService } from 'src/app/services/question.service'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  constructor(private questionService: QuestionService) {
    this.getQuestions()
  }
  questions: any[] = []
  location: any = null

  getQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (value) => {
        // Use an arrow function to retain the correct 'this' context
        this.questions = value
        console.log('questions', this.questions)
      },
      error: (error) => {
        console.error('Error fetching questions:', error)
      },
    })
  }

  // Haversine formula to calculate distance between two points
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers
    return distance
  }
  getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = `${position.coords.latitude}, ${position.coords.longitude}`
        },
        (error) => {
          console.error('Error getting user location:', error)
        },
      )
    } else {
      console.log('Geolocation is not available in this browser.')
    }
  }
  sortByDistance() {
    this.getUserLocation()
    if (this.location)
      this.questions = this.questions
        .map((question) => {
          const [latitude, longitude] = question.location.split(',').map(Number)
          const distance = this.calculateDistance(
            this.location.latitude,
            this.location.longitude,
            latitude,
            longitude,
          )
          return { ...question, distance }
        })
        .sort((a, b) => a.distance - b.distance)
  }
}
