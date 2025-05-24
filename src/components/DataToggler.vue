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
      currentDate: new Date(), // Всегда начало выбранной недели
      today: new Date(),
    };
  },
  computed: {
    minDate() {
      return this.earliestDate ? new Date(this.earliestDate) : null;
    },
    
    weekEnd() {
      const end = new Date(this.currentDate);
      end.setDate(end.getDate() + 6);
      return end;
    },
    
    formattedWeekStart() {
      return this.formatDate(this.currentDate);
    },
    
    formattedWeekEnd() {
      return this.formatDate(this.weekEnd);
    },
    
    isFirstWeek() {
      if (!this.minDate) return false;
      const weekEnd = new Date(this.weekEnd);
      return weekEnd <= this.minDate;
    },
  },
  methods: {
    prevWeek() {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      
      if (!this.minDate || newDate >= new Date(this.minDate)) {
        this.currentDate = newDate;
        this.emitWeekChange();
      } else {
        this.currentDate = new Date(this.minDate);
        this.emitWeekChange();
      }
    },
    
    nextWeek() {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      this.currentDate = newDate;
      this.emitWeekChange();
    },
    
    emitWeekChange() {
      this.$emit('week-changed', {
        start: this.currentDate.toISOString().split('T')[0],
        end: this.weekEnd.toISOString().split('T')[0],
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
    const dayOfWeek = this.today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    this.currentDate.setDate(this.today.getDate() - diff);
    this.currentDate.setHours(0, 0, 0, 0);
    
    if (this.minDate && this.currentDate < this.minDate) {
      this.currentDate = new Date(this.minDate);
    }
    
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