import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'categoryList'})

export class CategoryListPipe implements PipeTransform {
    transform(mediaItems) {
        var categories =[];
      mediaItems.forEach(mediaItem => {
          if (categories.indexOf(mediaItem.category) <= -1) {
            categories.push(mediaItem.category);
          }
      });
      return categories.join(',');
    }
}