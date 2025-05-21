<template>
  <div class="date-switcher">
    <button 
      @click="prevWeek" 
      class="date-switcher__button"
      :disabled="isFirstWeek"
    >←</button>
    
    <span class="date-switcher__current">
      {{ formattedWeekStart }} – {{ formattedWeekEnd }}
    </span>
    
    <button 
      @click="nextWeek" 
      class="date-switcher__button"
      :disabled="isCurrentWeek"
    >→</button>
  </div>
</template>

<script>
export default {
  name: 'DateToggler',
  props: {
    earliestDate: String,
  },
  data() {
    return {
      currentDate: new Date(), // Всегда понедельник выбранной недели
      today: new Date(),
    };
  },
  computed: {
    minDate() {
      return this.earliestDate ? new Date(this.earliestDate) : null;
    },
    
    // Конец текущей недели (воскресенье)
    weekEnd() {
      const end = new Date(this.currentDate);
      end.setDate(end.getDate() + 6);
      return end;
    },
    
    // Форматированные даты для отображения
    formattedWeekStart() {
      return this.formatDate(this.currentDate);
    },
    formattedWeekEnd() {
      return this.formatDate(this.weekEnd);
    },
    
    isCurrentWeek() {
      return this.weekEnd >= this.today;
    },
    isFirstWeek() {
      return this.minDate && this.currentDate <= this.minDate;
    },
  },
  methods: {
    prevWeek() {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      
      if (!this.minDate || newDate >= this.minDate) {
        this.currentDate = newDate;
        this.emitWeekChange();
      }
    },
    
    nextWeek() {
      if (this.isCurrentWeek) return;
      
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      this.currentDate = newDate;
      this.emitWeekChange();
    },
    
    emitWeekChange() {
      this.$emit('week-changed', {
        start: new Date(this.currentDate),
        end: new Date(this.weekEnd),
      });
    },
    
    formatDate(date) {
      return date.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long'
      });
    },
  },
  created() {
    // Устанавливаем начало текущей недели (понедельник)
    const dayOfWeek = this.today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    this.currentDate.setDate(this.today.getDate() - diff);
    
    // Инициируем первое событие
    this.emitWeekChange();
  },
};
</script>

<style scoped>
.date-switcher {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
}

.date-switcher__button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.date-switcher__button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.date-switcher__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.date-switcher__current {
  min-width: 200px;
  text-align: center;
  font-weight: 500;
}
</style>