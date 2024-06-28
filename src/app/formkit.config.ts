// formkit.config.ts
import { defineFormKitConfig } from '@formkit/vue'
import { rootClasses } from '../../formkit.theme.ts'
 
export const theme = defineFormKitConfig({
  config: {
    rootClasses
  }
})