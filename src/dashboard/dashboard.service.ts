import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRequestStatus } from 'src/common/types';
import { Request } from 'src/request/request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Request) private readonly requestRepo: Repository<Request>
    ){}

    async dashboard() {
        // Get Recent Requests from repo
        const latest_requests = await this.requestRepo.find({
          order: { created_at: 'DESC' }, // Sorted in descending order (latest first)
          take: 5, // Limit to 5 records
        });

        // Get count of pending requests
        const pending_requests = await this.requestRepo.count({where:{status: CardRequestStatus.PENDING}})
        
        
        return {
          name: 'Nazeer',
          last_login: new Date(),

          //   This should calculated from cards modules
          // But for now we return dummy values to simulate the real-time calculations
          total_active_cards: {
            current_month: 345566,
            last_month: 245565,
            increase: (345566 / 245565) * 100,
          },
          personalized_cards: {
            current_month: 145565,
            last_month: 45566,
            increase: (145565 / 45566) * 100,
          },
          revenue: {
            today: 9000000,
            yesterda: 7000000,
            increase: (9000000 / 7000000) * 100,
          },

          //   Real-time pending request
          pending_requests,
          latest_requests,

          //   Dummy data here for monthly issuance for the last 7 months
          //   This should be calculated if we have complete card modules
          monthly_issuance: [
            {
              month: 'Jan',
              personalized: 120,
              instant: 80,
              total: 200,
            },
            {
              month: 'Feb',
              personalized: 90,
              instant: 60,
              total: 150,
            },
            {
              month: 'Mar',
              personalized: 110,
              instant: 70,
              total: 180,
            },
            {
              month: 'Apr',
              personalized: 140,
              instant: 90,
              total: 230,
            },
            {
              month: 'May',
              personalized: 100,
              instant: 50,
              total: 150,
            },
            {
              month: 'Jun',
              personalized: 130,
              instant: 85,
              total: 215,
            },
            {
              month: 'Jul',
              personalized: 95,
              instant: 60,
              total: 155,
            },
          ],
          current_week_income: [
            {
              day: 'Mon',
              income: 40000,
            },
            {
              day: 'Tue',
              income: 50000,
            },
            {
              day: 'Wed',
              income: 30000,
            },
            {
              day: 'Thu',
              income: 70000,
            },
            {
              day: 'Fri',
              income: 40000,
            },
            {
              day: 'Sat',
              income: 50000,
            },
            {
              day: 'Sun',
              income: 60000,
            },
          ],
          card_status_distribution: {
            total: 1000,
            statuses: [
              { name: 'Active', count: 600 },
              { name: 'Expired', count: 150 },
              { name: 'Inactive', count: 100 },
              { name: 'Blocked', count: 80 },
              { name: 'Lost', count: 70 },
            ],
          },
        };
    }
}
