
const svg = d3.select('body').append('svg')
    .attr('width', 1000)
    .attr('height', 700)
    .append('g')
    .attr('transform', 'translate(50, 50)');



fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json')
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

            d3.treemap()
            .size(['700', '500'])
            .padding(2)
            (root)
        
          
            var color = d3.scaleOrdinal()
                .domain(data.children.map(d => d.name))
                .range(d3.schemePuBuGn[9]);

        const tooltip = d3.select('body').append('div')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid black')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .style('font-size', '12px');

          svg
            .selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr('class', 'tile')
              .attr('x', function (d) { return d.x0; })
              .attr('y', function (d) { return d.y0; })
              .attr('width', function (d) { return d.x1 - d.x0; })
              .attr('height', function (d) { return d.y1 - d.y0; })
              .attr('data-name', function(d) { return d.data.name; })
              .attr('data-category', function(d) { return d.data.category; })
                .attr('data-value', function(d) { return d.data.value; })
              .style("stroke", "black")
              .style("fill", color)
                .on('mouseover', function( e, d) {
                    d3.select(this).style('fill', 'red');
                    const tooltip = d3.select('#tooltip')
                        .style('opacity', 1)
                        .attr('data-value', d.data.value)
                        .html(`Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`)
                        .style('position', 'absolute')
                        .style('left', `${e.pageX}px`)
                        .style('top', `${e.pageY}px`);

                })
                .on('mouseout', function() {
                    d3.select(this).style('fill', color);
                    d3.select('#tooltip')
                        .style('opacity', 0);
                });
        
          
          svg
            .selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
              .attr("x", function(d){ return d.x0+5}) 
            
              .attr("y", function(d){ return d.y0+40}) 
              .text(function(d){ return d.data.name })
              .attr("font-size", "12px")


              
              .attr("fill", "white")


              const categories = data.children.map(d => d.name);
        
        const legend = svg.append('g')
            .attr('id', 'legend')
            .attr('transform', 'translate(0, 600)')
            .selectAll('g')
            .data(categories)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${i * 100}, 0)`);

        legend.append('rect')
            .attr('width', 20)
            .attr('height', 20)
            .attr('x', 0)
            .attr('y', 0)
            .attr('class', 'legend-item')
            .attr('fill', d => color(d));

        legend.append('text')
            .attr('x', 25)
            .attr('y', 15)
            .text(d => d)
            .attr('fill', 'black')
            .attr('font-size', '12px');



           

        })

        
        

        

           

    



