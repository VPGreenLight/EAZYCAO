import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardData } from '../../interfaces/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Chart,
  ChartConfiguration,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

@Component({
  selector: 'app-dashboard-manager',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss'],
})
export class DashboardManagerComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  months: string[] = [];
  revenues: number[] = [];
  private chart: Chart | null = null; // Lưu trữ biểu đồ

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend);

    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.months = data.allMonths;
        this.revenues = data.monthlyRevenues;
        this.loadChart();
      },
      error: (err) => console.error('Failed to load data:', err),
    });
  }

  private loadChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Canvas element not found!');
      return;
    }

    // Hủy biểu đồ cũ nếu tồn tại
    if (this.chart) {
      this.chart.destroy();
    }

    // Tạo biểu đồ mới
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Doanh thu',
            data: this.revenues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Doanh Thu Theo Tháng',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  viewProduct(product: any): void {
    console.log('Viewing product:', product);
  }
}

